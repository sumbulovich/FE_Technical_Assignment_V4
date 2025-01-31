export const CATEGORIES_QUERIES = {
  GET_CATEGORIES: `
  {
    getCategoryList {
      items {
        _id
        title
      }
      total
    }
  }
  `
}
