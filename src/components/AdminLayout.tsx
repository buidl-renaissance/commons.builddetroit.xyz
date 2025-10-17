import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.creamyBeige};
`;

const Sidebar = styled.aside<{ $isCollapsed: boolean }>`
  width: ${({ $isCollapsed }) => ($isCollapsed ? '80px' : '250px')};
  background-color: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  transition: width 0.3s ease;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  z-index: 1000;

  @media (max-width: 768px) {
    width: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '250px')};
    transform: ${({ $isCollapsed }) => ($isCollapsed ? 'translateX(-100%)' : 'translateX(0)')};
  }
`;

const SidebarHeader = styled.div`
  padding: 2rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.rustedSteel};
  text-align: center;
`;

const Logo = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.colors.neonOrange};
`;

const Nav = styled.nav`
  padding: 1rem 0;
`;

const NavItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.neonOrange : theme.colors.creamyBeige};
  background-color: ${({ theme, $isActive }) => 
    $isActive ? 'rgba(255, 165, 0, 0.1)' : 'transparent'};
  border-left: ${({ theme, $isActive }) => 
    $isActive ? `3px solid ${theme.colors.neonOrange}` : '3px solid transparent'};
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: rgba(255, 165, 0, 0.1);
    color: ${({ theme }) => theme.colors.neonOrange};
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  text-decoration: none;
  color: inherit;
`;

const NavIcon = styled.span`
  width: 20px;
  margin-right: 1rem;
  font-size: 1.2rem;
`;

const NavText = styled.span<{ $isCollapsed: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: ${({ $isCollapsed }) => ($isCollapsed ? '0' : '1')};
  transition: opacity 0.3s ease;
  white-space: nowrap;
  font-weight: 600;
`;

const Badge = styled.span`
  background-color: ${({ theme }) => theme.colors.neonOrange};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  margin-left: auto;
  min-width: 18px;
  text-align: center;
`;

const MainContent = styled.main<{ $sidebarCollapsed: boolean }>`
  flex: 1;
  margin-left: ${({ $sidebarCollapsed }) => ($sidebarCollapsed ? '80px' : '250px')};
  transition: margin-left 0.3s ease;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background-color: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  }
`;

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/projects', label: 'Projects', icon: '🚀' },
    { path: '/admin/expenses', label: 'Expenses', icon: '💰' },
    { path: '/admin/invitations', label: 'Invitations', icon: '📧' },
    { path: '/admin/members', label: 'Members', icon: '👥' },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return router.pathname === '/admin';
    }
    return router.pathname.startsWith(path);
  };

  return (
    <ThemeProvider theme={theme}>
      <LayoutContainer>
        <MobileMenuButton onClick={toggleMobileMenu}>
          ☰
        </MobileMenuButton>
        
        <Overlay $isOpen={mobileMenuOpen} onClick={closeMobileMenu} />
        
        <Sidebar $isCollapsed={sidebarCollapsed}>
          <SidebarHeader>
            <Logo>Admin</Logo>
          </SidebarHeader>
          
          <Nav>
            {navItems.map((item) => (
              <NavItem key={item.path} $isActive={isActive(item.path)}>
                <NavLink href={item.path} onClick={closeMobileMenu}>
                  <NavIcon>{item.icon}</NavIcon>
                  <NavText $isCollapsed={sidebarCollapsed}>{item.label}</NavText>
                  {/* TODO: Add badge counts when dashboard API is ready */}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </Sidebar>

        <MainContent $sidebarCollapsed={sidebarCollapsed}>
          {children}
        </MainContent>
      </LayoutContainer>
    </ThemeProvider>
  );
};

export default AdminLayout;
