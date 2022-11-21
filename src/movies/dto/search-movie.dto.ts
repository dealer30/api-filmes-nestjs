export const titleQuery = (title)=>{return {
    'name': 'title',
    'type': 'string',
    'description': title == 'Categoria' ? 'Nome da categoria' : 'Nome do filme',
    'required': true,
}}

export const takeQuery = (title)=>{ return {
    'name': 'take',
    'type': 'number',
    'description': `Quantidade de ${title == 'Categoria' ? 'categorias' : 'filmes'} a serem retornados`,
    'required': false,
}}

export const skipQuery = (title)=>{ return {
    'name': 'skip',
    'type': 'number',
    'description': `Quantidade de ${title == 'Categoria' ? 'categorias' : 'filmes'} a serem pulados`,
    'required': false,
}}