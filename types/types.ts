export type ProdutoIndividualType = {
    id?: string;
    nome: string;
    descricao?: string;
    preco: number;
    eh_combo: false;
    combo_products?: [];
    quantidade_estoque: number;
    key_img?: string;
};

export type ProdutoComboType = {
    id?: string;
    nome: string;
    descricao?: string;
    quantidade_estoque: number;
    preco: number;
    eh_combo: true;
    combo_products: ItemComboType[];
    key_img?: string;
};

export type ItemComboType = {
    id?: string;
    nome: string;
    quantidade: number;
};

export type ProdutoUpdateType = {
    nome_antigo: string;
    nome: string;
    descricao?: string;
    quantidade_estoque: number;
    preco: number;
    eh_combo: boolean;
    combo_products: ItemComboType[];
    key_img?: string;
};

export type ProdutosType = ProdutoIndividualType | ProdutoComboType;

export type ProdutoVendaType = {
    nome: string,
    preco: number,
    quantidade: number
}

export type SaleType = {
    preco_total: number;
    produtos: ProdutoVendaType[];
};