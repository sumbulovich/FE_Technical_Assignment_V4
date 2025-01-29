export const PRODUCT_QUERIES = {
  GET_PRODUCTS: `
  {
    getProductList {
      items {
        _id
        category {
          _id
          title
        }
        description
        image {
          _id
          caption
          credit
          description
          filename
          mimeType
          path
          sourceUrl
          title
          uploadStatus
        }
        name
        price
      }
      total
    }
  }
  `,
  GET_PRODUCTS_BY_CATEGORY: `
  query getProductsByCategory($where: TSWhereProductInput!){
    getProductList(where: $where) {
      items {
        _id
        category {
          _id
          title
        }
        description
        image {
          _id
          caption
          credit
          description
          filename
          mimeType
          path
          sourceUrl
          title
          uploadStatus
        }
        name
        price
      }
      total
    }
  }
  `
}
