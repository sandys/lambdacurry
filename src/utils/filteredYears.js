export function filteredYears(posts) {
   const filteredYears = posts.map(({node}) => node.fields.slug.split("-")[0].replace(/\\|\//g,''));
  const uniqueYears = [...new Set(filteredYears)];

  return uniqueYears;
}