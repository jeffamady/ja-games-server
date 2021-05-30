import {Request, Response} from 'express';

import pool from '../database';

class GamesController {
    public async list (req: Request, res: Response) {
        const games = await (await pool).query('SELECT * FROM games');
        console.log(games);

        res.json(games);

    }

    public async getOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;

        const game =  await (await pool).query('SELECT * FROM games WHERE id= ?', [id]);
        if (game.length > 0) {
            return res.json(game[0]);
     
        }
        res.status(404).json({text: "The game doesn't exist" });

    }

    public async create (req: Request, res: Response) {
        (await pool).query('INSERT INTO games set ?', [req.body]);
        // console.log(req.body);
        
        //  (await pool).query('DESCRIBE games');
        res.json({message: 'Game saved'});
        
    }
    
    public async delete (req: Request, res: Response) {
        //  (await pool).query('DESCRIBE games');
        const { id } = req.params;
        
        const game = await (await pool).query('DELETE FROM games WHERE id= ?', [id]);
        
        res.json({message: "Game deleted"});
        
        // res.status(404).json({text: "The game doesn't exist" });
        
    }
    
    public async update (req: Request, res: Response) {
        const { id } = req.params;
        (await pool).query('UPDATE games set ? WHERE id = ?', [req.body, id]);
        res.json({message: "The game was uptated"})

    } 
}

export const gamesController = new GamesController();