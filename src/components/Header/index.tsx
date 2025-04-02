import { Scroll, Timer } from 'phosphor-react';
import logoIgnite from '../../assets/Logo.svg';
import { HeaderContainer } from './styles';
import { NavLink } from 'react-router';

export function Header() {
    return (
        <HeaderContainer>
            <span>
                <img src={logoIgnite} alt="" />
            </span>
            <nav>
                <NavLink
                    to="/"
                    title="Timer"
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    <Timer size={24} />
                </NavLink>
                <NavLink
                    to='history'
                    title='Histórico'
                    className={({ isActive }) => isActive ? "active" : ""}
                >
                    <Scroll size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}