import { CreateDetailsDto } from "./create-details.dto";

export class CreateTransactionDto {
    customer: string;
    employee: number;
    tax: number;
    tax_value: number;
    total: number;
    grand_total: number;
    details: CreateDetailsDto[];
}