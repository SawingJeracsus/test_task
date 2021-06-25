import {Comment} from './CommentTypes'

export interface Product{
    id: string,
	imageUrl: string,
	name: string,
	count: number,
	size: {
		width: number,
		height: number
	},
	weight: number,
	comments: Comment[],
    description: string
}