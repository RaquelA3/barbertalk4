import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Registro from './Registro';
import { vi } from 'vitest';

describe('Registro', () => {
  beforeEach(() => {
    window.alert = vi.fn();
  });

  test('muestra alerta si las contraseñas no coinciden', async () => {
    render(<Registro />);

    await userEvent.type(screen.getByLabelText(/contraseña:/i), '123456');
    await userEvent.type(screen.getByLabelText(/confirme su contraseña:/i), '654321');
    await userEvent.click(screen.getByRole('button', { name: /registrar/i }));

    expect(window.alert).toHaveBeenCalledWith('Las contraseñas no coinciden');
  });
});