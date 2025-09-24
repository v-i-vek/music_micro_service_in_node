// db.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME ,
  process.env.DB_USER ,
  process.env.DB_PASSWORD,{
    host: process.env.DB_HOST ,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // RDS self-signed cert
      },
    },
    logging: false, // disable SQL logging
  }
);

/**
 * Function to test and establish connection
 */
export async function connectDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({alter:true})
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1); // optional: exit app on failure
  }
}

export default sequelize;
