import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import type { ThemeType } from "@/styles/theme";

const AboutPreview = styled.section<{ theme: ThemeType }>`
  padding: 1rem;
  padding-top: 0;
  text-align: center;
  position: relative;
`;

const AboutText = styled.p<{ theme: ThemeType }>`
  font-size: 0.9rem;
  font-family: ${({ theme }) => theme.fonts.body};
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
  opacity: 0.9;
`;

const Footer = styled.footer<{ theme: ThemeType }>`
  background: ${({ theme }) => theme.colors.asphaltBlack};
  color: ${({ theme }) => theme.colors.creamyBeige};
  padding: 3rem 1rem 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.neonOrange},
      transparent
    );
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,79,0,0.15)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    z-index: 0;
  }
`;

const FooterContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

const FooterRow = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 480px) {
    gap: 1rem;
    flex-direction: column;
  }
`;

const FooterLink = styled.a<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.colors.neonOrange};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.creamyBeige};
  }
`;

const Logo = styled.div<{ theme: ThemeType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
`;


const FooterComponent: React.FC = () => {
    return (
        <Footer>
            <FooterContainer>
                <FooterRow>
                    <FooterLink href="https://github.com/buidl-renaissance/thebarefoot.dev" target="_blank">
                        <FontAwesomeIcon
                            icon={faGithub}
                            style={{ marginRight: "0.5rem" }}
                        />
                        GitHub
                    </FooterLink>
                    <FooterLink href="https://www.instagram.com/thebarefoot.dev" target="_blank">
                        <FontAwesomeIcon
                            icon={faInstagram}
                            style={{ marginRight: "0.5rem" }}
                        />
                        Instagram
                    </FooterLink>
                </FooterRow>
                <Logo>
                    <Image
                        src="/images/thebarefoot.dev.png"
                        alt="Barefoot Dev Logo"
                        width={100}
                        height={100}
                    />
                </Logo>
                <AboutPreview>
                    <AboutText>
                        We&apos;re inspired by the barefoot doctors of China —
                        community-trained, resourceful, and people-first. We build tech the
                        same way: with care, craft, and collective wisdom. <Link href="/about" style={{ color: "#FF4F00" }}>Learn more.</Link>
                    </AboutText>
                </AboutPreview>
            </FooterContainer>
        </Footer>
    );
};

export default FooterComponent; 