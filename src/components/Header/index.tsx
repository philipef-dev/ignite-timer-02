import Logo from '../../assets/Logo.svg';
import Clock from '../../assets/clock-item.svg';
import Menu from '../../assets/menu-item.svg';
import { HeaderContainer } from './styles';

export function Header() {
    return (
        <HeaderContainer>
            <div>
                <img src={Logo} alt="" />
            </div>
            <div className='teste'>
                <img src={Clock} alt="" />
                <img src={Menu} alt="" />
            </div>
        </HeaderContainer>
    )
}