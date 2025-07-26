'use client';
import Pagination from './Pagination';
import ResizableHeader from './ResizableHeader';
import Modal from './Modal';
import UserDetails from './UserDetails';
import ErrorMessage from './ErrorMessage';
import {SortDirection} from "@/types/user";
import {useUserTable} from "@/app/hooks/useUserTable";
import {columns} from "@/app/configs/userTableConfig";

const SortIndicator = ({direction}: { direction: SortDirection }) => {
    if (direction === 'asc') return <span className="ml-1">▲</span>;
    if (direction === 'desc') return <span className="ml-1">▼</span>;
    return null;
};

export default function UserTable() {
    const {
        users,
        error,
        isLoading,
        columnWidths,
        selectedUserId,
        sortConfig,
        pagination,
        handlers,
    } = useUserTable();


    const renderContent = () => {
        if (isLoading && users.length === 0) return <div className="p-4 text-center">Загрузка... ⏳</div>;
        if (error) return <ErrorMessage message={error.message} onRetry={handlers.loadUsers}/>;
        if (!isLoading && users.length === 0) return <div className="p-4 text-center">Пользователи не найдены.</div>;

        return (
            <>
                <div className="overflow-x-auto border border-gray-300 rounded-lg">
                    <table className="border-gray-300 table-fixed">
                        <thead>
                        <tr className="bg-gray-100">
                            {columns.map((col, index) => (
                                <ResizableHeader key={col.id} width={columnWidths[index]}
                                                 onResize={handlers.handleResize(index)}
                                                 className="border px-4 py-2 cursor-pointer hover:bg-gray-200"
                                                 onClick={() => col?.sortKey && handlers.handleSort(col.sortKey)}>
                                    {col.label}
                                    {col?.sortKey && <SortIndicator
                                        direction={sortConfig.key === col.sortKey ? sortConfig.direction : 'none'}/>}
                                </ResizableHeader>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="hover:bg-gray-100 cursor-pointer"
                                onClick={() => handlers.handleRowClick(u.id)}>
                                <td className="border px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap">{`${u.lastName} ${u.firstName} ${u.maidenName}`}</td>
                                <td className="border px-4 py-2 text-center overflow-hidden text-ellipsis whitespace-nowrap">{u.age}</td>
                                <td className="border px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap">{u.gender}</td>
                                <td className="border px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap">{u.phone}</td>
                                <td className="border px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap">{u.email}</td>
                                <td className="border px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap">{`${u.address.country}, ${u.address.city}`}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <Pagination {...pagination} />
            </>
        );
    };

    return (
        <div className="max-w-[1400px] w-full mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Таблица пользователей</h1>
            {renderContent()}
            <Modal isOpen={selectedUserId !== null} onClose={handlers.handleCloseModal}>
                {selectedUserId !== null ? <UserDetails userId={selectedUserId}/> : null}
            </Modal>
        </div>
    );
}
