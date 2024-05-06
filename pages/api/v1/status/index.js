import database from "infra/database.js";

async function status(request, response) {
  try {
    // Consulta para obter a versão do PostgreSQL
    const result = await database.query("SELECT version();");
    const fullVersionString = result.rows[0].version;

    const postgresVersion = fullVersionString.match(
      /PostgreSQL ([0-9]+\.[0-9]+)/,
    )[0];

    const updateAt = new Date().toISOString();
    response.status(200).json({
      postgres_version: postgresVersion,
      update_at: updateAt,
    });
  } catch (error) {
    console.error("Erro ao obter a versão do PostgreSQL:", error);
    response
      .status(500)
      .json({ error: "Erro ao obter a versão do PostgreSQL" });
  }
}

export default status;
