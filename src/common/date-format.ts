import { format } from 'date-fns';

export function formatDateAsDDMMYYYY(date: Date): string {
    return format(date, 'dd/MM/yyyy');
}
