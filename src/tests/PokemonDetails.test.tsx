import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.tsx />', () => {
  const charmander = '/pokemon/4';

  it('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />, { route: charmander });

    // A página deve conter um texto <name> Details, em que <name> é o nome do Pokémon.
    const checkText = screen.getByText(/Charmander details/i);
    expect(checkText).toBeInTheDocument();

    // A seção de detalhes deve conter um heading h2 com o texto Summary
    const levelTwoTitle = screen.getByRole('heading', { level: 2, name: /Summary/i });
    expect(levelTwoTitle).toBeInTheDocument();

    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado
    const navLink = screen.queryByRole('link', { name: /more details/i });
    expect(navLink).not.toBeInTheDocument();

    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado
    const paragraphContent = screen.getByText(/the flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly\./i);
    expect(paragraphContent).toBeInTheDocument();
  });

  it('Existe na página uma seção com os mapas contendo as localizações do Pokémon', async () => {
    renderWithRouter(<App />, { route: charmander });

    // Na seção de detalhes, deverá haver um heading h2 com o texto Game Locations of <name>; em que <name> é o nome do Pokémon exibido.
    const gameLocations = screen.getByRole('heading', { level: 2, name: /game locations of charmander/i });
    expect(gameLocations).toBeInTheDocument();

    const locationsElements = screen.getAllByRole('img', { name: /charmander location/i });
    expect(locationsElements.length).toBeGreaterThan(0);

    locationsElements.forEach((locationEl) => {
      expect((locationEl).getAttribute('src')).toBeTruthy();
      expect(locationEl).toHaveAttribute('alt', 'Charmander location');
    });
  });

  it('O usuário pode favoritar um pokémon por meio da página de detalhes', async () => {
    renderWithRouter(<App />, { route: charmander });
    // A página deve exibir um checkbox que permite favoritar o pokémon
    const favoriteBtn = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favoriteBtn).toBeInTheDocument();

    // Cliques alternados no checkbox devem adicionar e remover, respectivamente, o Pokémon da lista de favoritos.
    const favoriteInputEl = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }) as HTMLInputElement;
    await userEvent.click(favoriteInputEl);
    expect(favoriteInputEl.checked).toBe(true);

    await userEvent.click(favoriteInputEl);
    expect(favoriteInputEl.checked).toBe(false);
  });
});
