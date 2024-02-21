import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.tsx />', () => {
  it('É renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    // O nome correto do Pokémon deve ser mostrado na tela.
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.textContent).toMatch(/Pikachu/i);

    // O tipo correto do Pokémon deve ser mostrado na tela.
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.textContent).toMatch(/Electric/);

    // O peso médio do Pokémon deve ser exibido
    const pokemonWeight = screen.getByText(/Average weight: \d+\.\d kg/i);
    expect(pokemonWeight).toBeInTheDocument();

    // A imagem do Pokémon deve ser exibida
    const pokemonImg = screen.getByAltText('Pikachu sprite');
    expect(pokemonImg).toBeInTheDocument;
    expect(pokemonImg.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');


  });

  it('O card do Pokémon deve conter um link de navegação para exibir detalhes desse pokémon', () => {
    renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', { name: /more details/i });
    expect(pokemonLink).toBeInTheDocument();
    expect(pokemonLink.getAttribute('href')).toBe(`/pokemon/25`)
  })
});
