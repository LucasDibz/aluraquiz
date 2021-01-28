import styled from 'styled-components';

const AlternativesForm = styled.form`
  label {
    &[data-selected='true'] {
      background-color: ${({ theme }) => theme.colors.primary};

      &[data-status='SUCCESS'] {
        background-color: ${({ theme }) => theme.colors.success};
        animation: blinker 2.5s linear infinite;

        @keyframes blinker {
          50% {
            opacity: 0.5;
          }
        }
      }
      &[data-status='ERROR'] {
        background-color: ${({ theme }) => theme.colors.wrong};
        animation: blinker 2.5s linear infinite;

        @keyframes blinker {
          50% {
            opacity: 0.5;
          }
        }
      }
    }
    &:focus {
      opacity: 1;
    }
  }
  button {
    margin-top: 24px;
  }
`;

export default AlternativesForm;
