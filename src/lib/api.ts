import {DetailedUser, FetchUsersParams, UsersApiResponse} from "@/types/user";

export class HttpError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.name = 'HttpError';
        this.status = status;
    }
}

export const fetchUsers = async ({
                                     limit,
                                     skip,
                                     query,
                                     sortBy,
                                     order,
                                 }: FetchUsersParams): Promise<UsersApiResponse> => {
    const baseUrl = query
        ? `https://dummyjson.com/users/search?q=${query}`
        : 'https://dummyjson.com/users';

    const params = new URLSearchParams({
        limit: String(limit),
        skip: String(skip),
        select: 'firstName,lastName,maidenName,age,gender,phone,email,address',
    });

    if (sortBy && order && !query) {
        params.append('sortBy', sortBy);
        params.append('order', order);
    }

    let response: Response;
    try {
        response = await fetch(`${baseUrl}?${params.toString()}`);
    } catch (error) {
        throw new Error('Ошибка сети. Проверьте ваше интернет-соединение.');
    }

    if (!response.ok) {
        const message = `Ошибка на сервере: ${response.status} ${response.statusText}`;
        throw new HttpError(response.status, message);
    }

    return response.json();
};

export const fetchUserById = async (userId: number): Promise<DetailedUser> => {
    try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`);
        if (!response.ok) {
            throw new HttpError(response.status, "Не удалось получить данные пользователя");
        }
        return response.json();
    } catch (error) {
        if (error instanceof HttpError) {
            throw error;
        }
        throw new Error("Ошибка сети. Проверьте ваше интернет-соединение.");
    }
};
