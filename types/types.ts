export type ProdutoIndividualType = {
    id: string;
    nome: string;
    descricao?: string;
    preco: number;
    eh_combo: false;
    combo_products?: [];
    quantidade_estoque: number;
};

export type ProdutoComboType = {
    id: string;
    nome: string;
    descricao?: string;
    preco: number;
    eh_combo: true;
    combo_products: ItemComboType[];
    quantidade_estoque: number;
};

export type ItemComboType = {
    id: string;
    nome: string;
    quantidade: number;
};

export type ProdutosType = ProdutoIndividualType | ProdutoComboType;
