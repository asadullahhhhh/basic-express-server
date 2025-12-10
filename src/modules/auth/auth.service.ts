import {pool} from '../../config/db';

const loginUser = async (email: string, password: string) => {
    const result = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [email])
    
    if(result.rows.length === 0) {
        return null
    }
}