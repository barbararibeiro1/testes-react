import { screen } from "@testing-library/react";
import renderWithRouter from "../renderWithRouter";
import App from '../App';
import userEvent from "@testing-library/user-event";

describe ('Teste o componente <FavoritePokemon.tsx />', () => {
  it('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito', () => {
    renderWithRouter(<App />, { route: '/favorites' });
    const favoriteMessage = screen.getByText(/No favorite Pokémon found/i);
    expect(favoriteMessage).toBeInTheDocument();
  });

})
