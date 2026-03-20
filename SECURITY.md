# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| latest  | ✅        |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT open a public issue**
2. Open a [private security advisory](https://github.com/chahyunwoo/github-tier/security/advisories/new)
3. Include a description of the vulnerability, steps to reproduce, and potential impact

We will respond within 48 hours and work with you to resolve the issue.

## Security Measures

This project implements the following security measures:

- **XSS Prevention** — All user input is XML-escaped before SVG rendering
- **GraphQL Injection Prevention** — Variables are bound, not interpolated
- **Input Validation** — GitHub usernames are validated against a strict regex
- **Request Timeout** — All external API calls have an 8-second timeout
- **No Secret Exposure** — `GITHUB_TOKEN` is server-side only, never included in responses
