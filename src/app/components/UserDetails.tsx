'use client';
import {useUserDetails} from "@/app/hooks/useUserDetails";

export default function UserDetails({ userId }: { userId: number }) {
    const { user, isLoading, error } = useUserDetails(userId);

    if (isLoading) return <div>Загрузка данных пользователя...</div>;
    if (error) return <div className="text-red-500">{error.message}</div>;
    if (!user) return null;

    return (
        <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0">
                <img src={user.image} alt="Avatar"
                     className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"/>
            </div>
            <div>
                <h2 className="text-3xl font-bold mb-2">{`${user.lastName} ${user.firstName} ${user.maidenName}`}</h2>
                <p><strong>Возраст:</strong> {user.age}</p>
                <p>
                    <strong>Адрес:</strong> {`${user.address.country}, ${user.address.city}, ${user.address.address}, ${user.address.postalCode}`}
                </p>
                <p><strong>Рост:</strong> {user.height} см</p>
                <p><strong>Вес:</strong> {user.weight} кг</p>
                <p><strong>Телефон:</strong> {user.phone}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
        </div>
    );
}
