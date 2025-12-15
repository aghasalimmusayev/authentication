import pool from "db/connection";

export class AuthModel {

    static async registerModel(username: string, email: string, password_hash: string) {
        const result = await pool.query(`insert into users (username, email, password_hash) values ($1, $2, $3) 
            returning id, username, email, created_at`, [username, email, password_hash])
        return result.rows[0]
    }

    static async loginModel(usernameOrEmail: string) {
        const result = await pool.query(`select * from users where username = $1 or email = $1`, [usernameOrEmail])
        return result.rows[0]
    }

    static async logoutAllModel(refreshToken: string) {
        const token = await pool.query(`select user_id from refresh_tokens where token = $1`, [refreshToken])
        if (token.rowCount === 0) throw new Error('UserId not found')
        const result = await pool.query(`delete from refresh_tokens where user_id = $1 returning *`, [token.rows[0].user_id])
        return result.rows[0]
    }

    static async logoutModel(refreshToken: string) {
        const result = await pool.query(`update refresh_tokens set is_revoked = true where token = $1 returning *`, [refreshToken])
        return result.rows[0]
    }

}