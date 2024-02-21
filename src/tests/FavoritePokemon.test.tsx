import { screen } from "@testing-library/react";
import renderWithRouter from "../renderWithRouter";
import App from '../App';
import userEvent from "@testing-library/user-event";
import { PokemonType } from "../types";
import { FavoritePokemon } from "../pages";
import pokemonList from "../data";

describe ('Teste o componente <FavoritePokemon.tsx />', () => {
  it('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito', () => {
    renderWithRouter(<App />, { route: '/favorites' });
    const favoriteMessage = screen.getByText(/No favorite Pokémon found/i);
    expect(favoriteMessage).toBeInTheDocument();
  });

  it('Apenas são exibidos os Pokémon favoritados', async () => {
    const favoritePokemonsMock: PokemonType[] = [
      { 
        id: 1, 
        name: 'Pikachu', 
        type: 'Electric', 
        averageWeight: { 
          value: '', 
          measurementUnit: 'kg' 
        }, 
        foundAt: [], 
        image: 'pikachu.png', 
        moreInfo: 'https://pokemon.com/pikachu', 
        summary: 'Pikachu is an Electric type Pokémon.' 
      },
      { 
        id: 2, 
        name: 'Charmander', 
        type: 'Fire', 
        averageWeight: { 
          value: '', 
          measurementUnit: 'kg' 
        }, 
        foundAt: [], 
        image: 'charmander.png', 
        moreInfo: 'https://pokemon.com/charmander', 
        summary: 'Charmander is a Fire type Pokémon.' 
      }
    ];
    renderWithRouter(<FavoritePokemon pokemonList={ favoritePokemonsMock } />);
    
    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    const secondPokemon = screen.getByText(/Charmander/i);
    expect(secondPokemon).toBeInTheDocument();
  })
});
