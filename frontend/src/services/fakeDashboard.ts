export async function fakeDashboardData() {
  await new Promise((resolve) => setTimeout(resolve, 700))

  return {
    totalUsers: 120,
    totalCourses: 8,
    notifications: [
      'Novo aluno cadastrado',
      'Curso Vue atualizado',
      'Pagamento confirmado'
    ]
  }
}
