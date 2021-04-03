module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "airbnb",
        "airbnb/hooks"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "quotes": ["error", "single"],
        "no-shadow": "off",
        "indent": "off",
        "react/jsx-indent": ["warn", 4],
        "react/jsx-indent-props": ["warn", 4],
        "react-hooks/exhaustive-deps": "off",
        "react/no-array-index-key": "warn",
        "arrow-body-style": "off",
        "react/jsx-props-no-spreading": "off",
        "react/forbid-prop-types": "off",
        "comma-dangle": "off",
        "object-curly-newline": "off",
        "consistent-return": "off",
        "global-require": "off",
        "react/require-default-props": "off",
        "no-underscore-dangle": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "react/destructuring-assignment": "off",
        "react/prop-types": "off",
        "max-len": ["error", { "code": 180 }]
    }
};
