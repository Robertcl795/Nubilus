import express from 'express'
import bodyParser from 'body-parser'
import GraphQLHTTP from 'express-graphql'
import { buildSchema } from 'graphql'
import { connect } from 'mongoose'
import { hash } from 'bcryptjs'

import Config from './config'
import Event, {IEvent} from './models/Event'
import User, { IUser } from './models/User';

class Server {
    public app: express.Application
    private config: Config

    constructor() {
        this.app = express()
        this.config = new Config()
        this.setup()
        this.createConnection()
    }

    private setup() {
        this.app.set('port', this.config.port)
        this.app.use(bodyParser.json())
        this.app.use(express.urlencoded({extended: false}))
        this.app.use('/graphql', GraphQLHTTP({
            schema: buildSchema(`
                type Event {
                    _id: ID!
                    title: String!
                    description: String!
                    price: Float!
                    date: String!
                }

                type User {
                    _id: ID!
                    email: String!
                    password: String
                }

                input EventInput {
                    title: String!
                    description: String!
                    price: Float!
                    date: String!
                }

                input UserInput {
                    email: String!
                    password: String!
                }

                type RootQuery {
                    events: [Event!]!
                }

                type RootMutation {
                    createEvent(eventInput: EventInput): Event
                    createUser(userInput: UserInput): User
                }

                schema {
                    query: RootQuery
                    mutation: RootMutation
                }
            `),
            rootValue: {
                events: () => {
                    return Event.find().then(result => {
                        return result
                    }).catch(err => console.log(err))
                },
                createEvent: (args: {eventInput: IEvent}) => {
                    const event = new Event({
                        title: args.eventInput.title,
                        description: args.eventInput.description,
                        price: +args.eventInput.price,
                        date: new Date(args.eventInput.date),
                        createdBy: "5cb2d88fb095830f6caff481"
                    })
                    let tempEvent: IEvent
                    return event.save().then((result) => {
                        tempEvent = result
                        return User.findById('5cb2d88fb095830f6caff481')
                    }).then(user => {
                        if(!user) throw new Error('User Exists Already')
                        user.createdEvents.push(event.id)
                        return user.save()
                    }).then(() => {
                        return tempEvent
                    }).catch(err => console.log(err))
                },
                createUser: (args: {userInput: IUser}) => {
                    const {password, email} = args.userInput;
                    return User.findOne({email}).then(user => {
                        if(user) throw new Error('User already exists')
                        return hash(password, 12)  
                    }).then(hashedPass => {
                        const user = new User({
                            email: email,
                            password: hashedPass
                        })
                        return user.save().then(result => {
                            return {...result, password: null};
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }
            },
            graphiql: true
        }))
    }

    private createConnection() {
        connect(`mongodb+srv://${this.config.username}:${
                this.config.password
            }@nubilus-h36yg.gcp.mongodb.net/${this.config.database}?retryWrites=true`
        ).then(() => {
            this.start()
        }).catch(err => console.log(err))
    }

    private start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`This app is running on port ${this.app.get('port')}`)
        })
    }
}

export default new Server()