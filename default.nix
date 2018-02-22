with import <nixpkgs> {};

stdenv.mkDerivation {
    name = "quecoin";
    buildInputs = [
        nodejs-8_x yarn
    ];
    shellHook = ''
        export PATH="$PWD/node_modules/.bin/:$PATH"
    '';
}
