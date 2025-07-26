import {useState, useCallback, useEffect} from 'react';
import {fetchUsers} from '@/lib/api';
import {SortableKey, SortConfig, SortDirection, User} from "@/types/user";

const INITIAL_PAGE = 1;
const ITEMS_PER_PAGE = 10;
const INITIAL_COLUMN_WIDTHS = [400, 100, 120, 200, 250, 230];

export function useUserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [sortConfig, setSortConfig] = useState<SortConfig>({key: null, direction: 'none'});
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [columnWidths, setColumnWidths] = useState(INITIAL_COLUMN_WIDTHS);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;
    const params = {
      limit: ITEMS_PER_PAGE,
      skip,
      query: searchTerm,
      sortBy: sortConfig.key && sortConfig.direction !== 'none' ? sortConfig.key : undefined,
      order: sortConfig.key && sortConfig.direction !== 'none' ? sortConfig.direction : undefined,
    };

    try {
      const data = await fetchUsers(params);
      setUsers(data.users);
      setTotalUsers(data.total);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Произошла неизвестная ошибка'));
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm, sortConfig]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSort = (key: SortableKey) => {
    setCurrentPage(INITIAL_PAGE);
    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    else if (sortConfig.key === key && sortConfig.direction === 'desc') direction = 'none';
    setSortConfig({key, direction});
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(INITIAL_PAGE);
  };

  const handleResize = (index: number) => (_: unknown, {size}: { size: { width: number; height: number }}) => {
    setColumnWidths(prev => {
      const newWidths = [...prev];
      newWidths[index] = size.width;
      return newWidths;
    });
  };

  const handleRowClick = (userId: number) => setSelectedUserId(userId);
  const handleCloseModal = () => setSelectedUserId(null);

  return {
    users,
    error,
    isLoading,
    columnWidths,
    selectedUserId,
    sortConfig,
    pagination: {
      currentPage,
      totalPages: Math.ceil(totalUsers / ITEMS_PER_PAGE),
      onPageChange: setCurrentPage,
    },
    handlers: {
      loadUsers,
      handleSort,
      handleSearchChange,
      handleResize,
      handleRowClick,
      handleCloseModal,
    },
  };
}
