with import <nixpkgs> {};

stdenv.mkDerivation {
    name = "quecoin";
    buildInputs = [
        nodejs-8_x
    ];
    shellHook = ''
        export PATH="$PWD/node_modules/.bin/:$PATH"
    '';
}