import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionContext } from "../../../../contexts/TransactionsContext";
import { useContext } from "react";

const searchFormSchema = z.object({
    query: z.string()
})

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
    const { fetchTransactions } = useContext(TransactionContext);

    const { register,
            handleSubmit,
            formState: { isSubmitting} 
        } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema),
    });

    async function handleSeachTransaction(data: SearchFormInputs) {
        await fetchTransactions(data.query);
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSeachTransaction)}>
            <input 
             type="text"
             placeholder="Pesquisar transações" 
             {...register('query')}
             />
            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                Pesquisar
            </button>
        </SearchFormContainer>
    )
}