import { useState } from "react";
export default function Index(){
  function FilterableProductTable({products}){
    const [filterText,setFilterText] = useState('')
    const [inStockOnly,setInStockOnly] = useState(false)
    return(
      <>
      <SearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterTextChange={setFilterText} onInStockOnlyChange={setInStockOnly}/>
      <ProductTable filterText={filterText} inStockOnly={inStockOnly} products={products}/>
      </>
    )
  }
  function ProductCategoryRow({category}){
  return(
    <>
  <tr>
    <th>{category}</th>
  </tr>
    </>
  )
}
function ProductRow({product}){
  let name = product.stocked? product.name : <span style={{color:'red'}}>{product.name}</span>
  return(
    <>
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
    </>
  )
}
  function ProductTable({products,filterText,inStockOnly}){
    const rows = [];
    let lastCategory = null

    products.forEach(product => {
      if(product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1){
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if(product.category !== lastCategory){
        rows.push(
          <ProductCategoryRow category={product.category} key={product.category}/>
        )
      }
      rows.push(
          <ProductRow product={product} key={product.name}/>
      )
      lastCategory = product.category
    });

    return(
      <>
      <table>
        <thead>
          <th>name</th>
          <th>price</th>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      </>
    )
  }
  function SearchBar({filterText,inStockOnly,onFilterTextChange,onInStockOnlyChange}){
    return(
      <>
      <input type="text" placeholder="search" value={filterText} onChange={e => onFilterTextChange(e.target.value)} />
      <label htmlFor="">
        <input type="checkbox" checked={inStockOnly} onChange={e => onInStockOnlyChange(e.target.checked)} />
        only show  stocked products
      </label>
      </>
    )
  }

  const PRODUCTS = [
    {name:"apple", category:'fruit', price:'$1', stocked:true},
    {name:"mango", category:'fruit', price:'$1', stocked:true},
    {name:"banana", category:'fruit', price:'$1', stocked:false},
    {name:"turnip", category:'vegetable', price:'$1', stocked:true},
    {name:"grounder", category:'vegetable', price:'$1', stocked:false},
    {name:"potato", category:'vegetable', price:'$1', stocked:true},
  ]
  return(
    <>
    <FilterableProductTable products={PRODUCTS}/>
    </>
  )
}
