import express from 'express'
import dotenv from 'dotenv'
import mariadb from 'mariadb'
import cors from 'cors'
dotenv.config()
const app = express()

//@ts-ignore
const DB_PORT = parseInt(process.env.DB_PORT | '33660')

const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '12345',
    connectionLimit: 5,
    port: DB_PORT
})
pool.getConnection().then(conn => {
    conn.query('CREATE DATABASE IF NOT EXISTS `test_task` ').then(() => {
        conn.query('USE `test_task`')
        conn.query(`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'`).then(tables => {
            let existsProducts = false
            for(let i = 0; i < tables.length; i++){
                if(tables[i].TABLE_NAME === 'products'){
                    existsProducts = true
                    console.log('Table products allready exist, skipping creating step...');
                }
            }

           
            if(!existsProducts){
                conn.query(`
                    CREATE TABLE products (
                        id int NOT NULL AUTO_INCREMENT,
                        name varchar(255) NOT NULL,
                        imageUrl varchar(255),
                        count int,
                        width int,
                        height int,
                        weight int,
                        comments TEXT(900),
                        description TEXT(400),
                        PRIMARY KEY (id)
                    )
                `)
                console.log('products table created successfully');
            }
        }).catch(e => {
            console.warn(e.message);
        })
        
        app.use(cors())
        app.delete('/product', (req, res) => {
            const {id} = req.query
            if(!id){
                res.status(405).send('Invalid query parrams!')
                return
            }
            conn.query(`DELETE FROM \`products\` WHERE \`id\` = ${id}`).then(() => {
                res.status(200).send('Successfully removed')
            }).catch(() => {
                res.status(500).send('Server issue')
            })
        })
        app.put('/comment', (req, res) => {
            const {id, text} = req.query
            console.log(id, text);
            
            if(!(id && text)){
                res.status(405).send('Invalid query parrams!')
                return
            }
            const newComment = {
                date: new Date().toDateString(),
                text 
            }
            conn.query(`SELECT \`comments\` FROM \`products\` WHERE \`id\` = ${id}`).then(dbres => {
                conn.query(`UPDATE \`products\` SET \`comments\` = '${JSON.stringify([...JSON.parse(dbres[0].comments), newComment])}' WHERE \`id\` = ${id}`).then(() => {
                    res.status(200).send('Successfully comment uppended')
                }) 
            }).catch((err) => {
                console.log(err);
                
                res.status(500).send('Server issue')
            })
        })
        app.get('/product', (req, res) => {
            const {id} = req.query
            if(!id){
                res.status(405).send('Invalid query parrams!')
                return
            }

            conn.query(`SELECT * FROM \`products\` WHERE \`id\` =  ${id}`).then(dbres => {
                if(!dbres[0]){
                    console.log(dbres);
                    
                    res.status(404).send('Not founded')
                    return
                }
                res.status(200).json({
                    id: dbres[0].id,
                    imageUrl: dbres[0].imageUrl,
                    name: dbres[0].name,
                    count: dbres[0].count,
                    size: {
                        width: dbres[0].width,
                        height: dbres[0].height
                    },
                    weight: dbres[0].weight,
                    comments: JSON.parse(dbres[0].comments),
                    description: dbres[0].description
                })
            })            
        })
        app.get('/products/:sortby', (req, res) => {
            const {sortby} = req.params
            const validSortingFields = ['name', 'count']
            if(!validSortingFields.includes(sortby)){
                res.status(405).send('Invalid sorting type')
                return
            }
            conn.query(`SELECT * FROM \`products\` ORDER BY ${sortby} `).then(db_responce => {
                res.status(200).json(db_responce.map((dbres: any) => ({
                    id: dbres.id,
                    imageUrl: dbres.imageUrl,
                    name: dbres.name,
                    count: dbres.count,
                    size: {
                        width: dbres.width,
                        height: dbres.height
                    },
                    weight: dbres.weight,
                    comments: JSON.parse(dbres.comments),
                    description: dbres.description
                })))
            })
        })

        app.post('/product', (req, res) => {
            const {
                imageUrl,
                name,
                count,
                width,
                height,
                weight,
                description
            } = req.query
            
            if(! (imageUrl && name && count && width && height && weight) ){
                res.status(405).json({
                    message: 'Invalid query'
                })
                return
            }
            console.log('here');
            
            conn.query(`INSERT INTO \`products\` ( name, imageUrl, count, width, height, weight, comments, description ) VALUES("${name}", "${imageUrl}", ${count}, ${width}, ${height}, ${weight}, '[]', '${description}') `).then((dbres) => {
                res.status(200).send(dbres.insertId.toString())
            })
            
        })
        
        app.listen(process.env.PORT || 9000, () => {
            console.log('App started on '+(process.env.PORT || 9000));
        })
        
    })
    
})




/*




Comment: {
	id: 3,
	productId: 1,
	description: 'some text here',
	date: 14:00 22.08.2021
}

*/