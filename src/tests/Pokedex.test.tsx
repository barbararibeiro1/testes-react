import { getByRole, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Teste o componente <Pokedex.tsx />', () => {
  it('A página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const pokedexTitle = screen.getByRole('heading', { level: 2, name: /Encountered Pokémon/i });
    expect(pokedexTitle).toBeInTheDocument();
  });

  it('É exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
    renderWithRouter(<App />);
    // O botão deve conter o texto próximo pokémon
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i});
    expect(nextPokemonBtn).toBeInTheDocument;
    
    // Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão.
    const firstPokemonEl = screen.getByText(/pikachu/i);
    expect(firstPokemonEl).toBeInTheDocument();
    await userEvent.click(nextPokemonBtn);
    const secondPokemonEl = screen.getByText(/charmander/i);
    expect(secondPokemonEl).toBeInTheDocument();
  });

  it('É mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonEl = screen.queryAllByTestId('pokemon-name');
    expect(pokemonEl.length).toBe(1);
  });

  it('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.', () => {
    renderWithRouter(<App />);
    const expectedTypes = ['Fire', 'Poison', 'Normal', 'Electric', 'Bug', 'Psychic', 'Dragon'];
    
    expectedTypes.forEach(type => {
      const btn = screen.getByRole('button', {name: new RegExp(type, 'i')});
      expect(btn).toBeInTheDocument();
    });
    
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    expect(allButtons.length).toBe(expectedTypes.length);
  });

  it('Após a seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', async () => {
    renderWithRouter(<App />);
    const fireFilterBtn = screen.getByRole('button', { name: /fire/i });
    await userEvent.click(fireFilterBtn);
    const currentPokemonType = screen.getByTestId('pokemon-type');
    expect(currentPokemonType).toHaveTextContent('Fire');
  });

  it('O botão all deve estar sempre visível', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toHaveStyle('display: inline-block');
  });

  it('A Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toHaveTextContent('All');
  });

  it('A Pokedéx deve mostrar os Pokémon normalmente (sem filtros) quando o botão All for clicado', async () => {
    renderWithRouter(<App />);
    const fireFilterBtn = screen.getByRole('button', { name: /fire/i });
    await userEvent.click(fireFilterBtn);
    const firePokemonName = screen.getByTestId('pokemon-name').textContent;
    
    const allButton = screen.getByRole('button', { name: /all/i });
    await userEvent.click(allButton);
    
    const allPokemonName = screen.getByTestId('pokemon-name').textContent;
    expect(allPokemonName).not.toEqual(firePokemonName);
  });
});
