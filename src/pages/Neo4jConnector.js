import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
    'bolt://localhost:7687',
    neo4j.auth.basic('neo4j', 'losalamos')
);

// Fonction utilitaire pour exécuter les requêtes Cypher
export const runCypherQuery = async (query) => {
    const session = driver.session();
    try {
        const result = await session.run(query);
        return result.records.map((record) => record.toObject());
    } finally {
        await session.close();
    }
};
