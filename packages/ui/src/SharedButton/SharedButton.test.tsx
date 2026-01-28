import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SharedButton } from './SharedButton';
import React from 'react';

describe('SharedButton', () => {
  it('renders correctly with primary variant', () => {
    render(<SharedButton variant="primary">Click me</SharedButton>);
    const button = screen.getByRole('button');

    expect(button.textContent).toBe('Click me');
    expect(button.style.backgroundColor).toBe('blue');
  });

  it('renders correctly with danger variant', () => {
    render(<SharedButton variant="danger">Delete</SharedButton>);
    const button = screen.getByRole('button');
    expect(button.style.backgroundColor).toBe('red');
  });
});