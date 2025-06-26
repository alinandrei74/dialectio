# Email Templates for dialectio.xyz

These email templates are designed for use with Supabase Auth and follow the visual design language of dialectio.xyz.

## Templates Included

### 1. `confirm-signup.html`
- **Purpose**: Email confirmation for new user registrations
- **Trigger**: When a user signs up and needs to verify their email
- **Variables**: `{{ .ConfirmationURL }}`

### 2. `reset-password.html`
- **Purpose**: Password reset requests
- **Trigger**: When a user requests a password reset
- **Variables**: `{{ .ConfirmationURL }}`

### 3. `magic-link.html`
- **Purpose**: Passwordless login via magic link
- **Trigger**: When a user requests a magic link for login
- **Variables**: `{{ .ConfirmationURL }}`

### 4. `email-change.html`
- **Purpose**: Confirm email address changes
- **Trigger**: When a user changes their email address
- **Variables**: `{{ .ConfirmationURL }}`, `{{ .Email }}`

### 5. `invite.html`
- **Purpose**: User invitations to join the platform
- **Trigger**: When an existing user invites someone new
- **Variables**: `{{ .ConfirmationURL }}`

## Design Features

- **Responsive**: Works perfectly on mobile and desktop
- **Brand Consistent**: Matches dialectio.xyz visual identity
- **Accessible**: High contrast and readable fonts
- **Secure**: Clear security messaging and expiration notices
- **Minimal**: Clean design with essential information only

## Supabase Configuration

To use these templates in Supabase:

1. Go to your Supabase Dashboard
2. Navigate to Authentication > Email Templates
3. Select the template type you want to customize
4. Copy and paste the HTML content from the corresponding file
5. Save the template

## Template Variables

Supabase automatically replaces these variables:
- `{{ .ConfirmationURL }}` - The action URL for the email
- `{{ .Email }}` - The user's email address (where applicable)
- `{{ .Token }}` - The confirmation token (if needed)

## Customization

Each template uses inline CSS for maximum email client compatibility. The design system includes:

- **Colors**: Blue, green, red, purple, and amber gradients
- **Typography**: Inter font family with bold weights
- **Shapes**: Geometric clip-path designs
- **Icons**: Emoji icons for universal compatibility
- **Layout**: Centered, card-based design with clear hierarchy

## Testing

Before deploying, test these templates with:
- Various email clients (Gmail, Outlook, Apple Mail, etc.)
- Mobile and desktop views
- Dark mode compatibility
- Link functionality

## Support

For questions about these templates, contact the dialectio.xyz development team.