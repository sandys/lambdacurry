export function filteredYears(posts) {
  const filteredYears = posts.map(({node}) => {
    const slug = node.fields.slug
    const blogName = slug.split("/")[2];
    
    return blogName.split("-")[0].replace(/\\|\//g,'')
  });
  
  const uniqueYears = [...new Set(filteredYears)];
  uniqueYears.sort((a, b) => (a > b ? -1 : 1));

  return uniqueYears;
}