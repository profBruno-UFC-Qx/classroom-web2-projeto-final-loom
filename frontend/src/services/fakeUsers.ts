export async function fakeUsers(page = 1, limit = 5) {
  await new Promise(resolve => setTimeout(resolve, 700))

  const total = 23

  const users = Array.from({ length: limit }, (_, i) => {
    const id = (page - 1) * limit + i + 1
    return {
      id,
      name: `Usuário ${id}`,
      email: `usuario${id}@email.com`
    }
  }).filter(u => u.id <= total)

  return {
    data: users,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  }
}
