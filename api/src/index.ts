import { ApolloServer, gql, IResolvers } from 'apollo-server'
import find from 'lodash/find'
import pickBy from 'lodash/pickBy'
import sortBy from 'lodash/sortBy'
import values from 'lodash/values'
import pokemon from './pokemon.json'

interface Pokemon {
  id: string
  num: string
  name: string
  img: string
  types: string[]
  weaknesses: string[]
  height: string
  weight: string
  egg: string
  prevEvolutions?: Array<{ num: string; name: string }>
  nextEvolutions?: Array<{ num: string; name: string }>
  candy?: string
  candyCount?: number
}

const typeDefs = gql`
  type Pokemon {
    id: ID!
    num: ID!
    name: String!
    img: String!
    types: [String!]!
    weaknesses: [String!]!
    height: String!
    weight: String!
    egg: String!
    prevEvolutions: [Pokemon!]!
    nextEvolutions: [Pokemon!]!
    candy: String
    candyCount: Int
  }

  type Query {
    pokemonTypes: [String]
    pokemonMany(skip: Int, limit: Int, searchValue: String): [Pokemon!]!
    pokemonOne(id: ID!): Pokemon
  }
`

// fuzzy match helper functions

const _isFuzzyMatch = (name: string, input: string[]) => {
  if (!input.length) {
    return true
  }
	return input.some((_, inputIndex: number) => _substringMatch(name, input, inputIndex, 3))
}

const _substringMatch = (name: string, input: string[], inputIndex: number, minCharMatch: number) => {
  if (input.length < minCharMatch) {
    return name.includes(input.join(''))
  }
	let matcher = '';
	for (let i = 0; i < minCharMatch; i++) {
		matcher += input[inputIndex + i] || '-'
  }
	return name.includes(matcher)
}

// resolvers

const resolvers: IResolvers<any, any> = {
  Pokemon: {
    prevEvolutions(rawPokemon: Pokemon) {
      return (
        rawPokemon.prevEvolutions?.map(evolution =>
          find(pokemon, otherPokemon => otherPokemon.num === evolution.num)
        ) || []
      )
    },
    nextEvolutions(rawPokemon: Pokemon) {
      return (
        rawPokemon.nextEvolutions?.map(evolution =>
          find(pokemon, otherPokemon => otherPokemon.num === evolution.num)
        ) || []
      )
    },
  },
  Query: {
    pokemonTypes(): string[] {
      const pokeList = values(pokemon)
      return pokeList.reduce((types: string[], poke) => {
        return [...new Set([...types, ...poke.types])]
      }, [])
    },
    pokemonMany(
      _,
      { skip = 0, limit = 999, searchValue = '' }: { skip?: number; limit?: number; searchValue?: string }
    ): Pokemon[] {
      const searchValueCharacters = searchValue.toLowerCase().split('')
      const matches = pickBy(pokemon, poke => _isFuzzyMatch(poke.name.toLowerCase(), searchValueCharacters))
      return sortBy(matches, poke => parseInt(poke.id, 10)).slice(
        skip,
        limit + skip
      )
    },
    pokemonOne(_, { id }: { id: string }): Pokemon {
      return (pokemon as Record<string, Pokemon>)[id]
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
