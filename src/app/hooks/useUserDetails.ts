import { useState, useEffect } from 'react';
import { fetchUserById } from '@/lib/api';
import { DetailedUser } from '@/types/user';

export function useUserDetails(userId: number) {
    const [user, setUser] = useState<DetailedUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!userId) {
            setIsLoading(false);
            return;
        }

        const loadUser = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await fetchUserById(userId);
                setUser(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Произошла неизвестная ошибка'));
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, [userId]);

    return { user, isLoading, error };
}
