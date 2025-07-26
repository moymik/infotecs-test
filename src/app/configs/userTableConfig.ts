import {SortableKey} from "@/types/user";

export const columns: { id: string, label: string, sortKey?: SortableKey }[] = [
    {id: 'name', label: 'ФИО', sortKey: 'lastName'},
    {id: 'age', label: 'Возраст', sortKey: 'age'},
    {id: 'gender', label: 'Пол', sortKey: 'gender'},
    {id: 'phone', label: 'Возраст', sortKey: 'phone'},
    {id: 'email', label: 'Email'},
    {id: 'contry_and_city', label: 'Страна и город'},
];
