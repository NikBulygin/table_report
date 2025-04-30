export default defineEventHandler(async event => {
  return [
    {
      Title: 'Ильменит',
      url: '/shop12',
      label: 'Ильменит'
    },
    {
      Title: 'Шлак',
      url: '/shop2',
      label: 'Шлак'
    }
  ] as NavItem[]
})
