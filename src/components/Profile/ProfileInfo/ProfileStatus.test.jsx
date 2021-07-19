import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileStatus from './ProfileStatus';

describe('ProfileStatus component', () => {
    it('status from props should be in the state', () => {
        render (
            <ProfileStatus status='Hello world' />
        );
        expect(screen.getByText('Hello world')).toBeInTheDocument();
    });
});