// Copyright 2018 Trinkler Software AG (CH).
// Trinkler Software provides free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version <http://www.gnu.org/licenses/>.

// **************************************************
// View HTML template.
// **************************************************
<template>
    <div id="imageWalletDemoApplication">

        <!-- ---------------------------------------------- -->
        <!-- Header                                         -->
        <!-- ---------------------------------------------- -->
        <b-navbar toggleable="md" type="dark" variant="dark">
            <b-navbar-brand href="#">Agora Imagewallet v{{ IW.version }}</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-form-radio-group buttons v-model="action" :options="actions"/>
            </b-navbar-nav>
        </b-navbar>
        <br />

        <!-- ---------------------------------------------- -->
        <!-- Encode                                         -->
        <!-- ---------------------------------------------- -->
        <b-container v-show="action === 'encode'">
            <!-- ---------------------------------------------- -->
            <!-- Credentials                                    -->
            <!-- ---------------------------------------------- -->
            <b-form-group>
                <b-row>
                    <b-col sm="3">
                        <label for="privateKeyInput">Private Key:</label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-input
                            v-model="encoding.credentials.privateKey"
                            id="privateKeyInput"
                            type="text"
                            required
                            placeholder="Please enter a private key" />
                    </b-col>
                </b-row>
            </b-form-group>
            <b-form-group>
                <b-row>
                    <b-col sm="3">
                        <label for="passwordInput">Password:</label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-input
                            v-model="encoding.credentials.password"
                            id="passwordInput"
                            type="password"
                            required
                            placeholder="Please enter a password" />
                    </b-col>
                </b-row>
            </b-form-group>

            <b-button v-on:click="onEncode" variant="secondary" :block=true>Generate Image Wallet</b-button>
            <br />
        </b-container>

        <!-- ---------------------------------------------- -->
        <!-- Decode                                         -->
        <!-- ---------------------------------------------- -->
        <b-container fluid v-show="action === 'decode'">
            <b-form-group>
                <b-row>
                    <b-col sm="3">
                        <label for="decodingPasswordInput">Password:</label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-input
                            id="decodingPasswordInput"
                            type="password"
                            v-model="decoding.password"
                            required
                            placeholder="Please enter a password" />
                    </b-col>
                </b-row>
            </b-form-group>
            <b-form-group>
                <b-form-file
                    v-model="decoding.walletFile"
                    :state="Boolean(decoding.walletFile)"
                    @input=onDecode
                    accept="image/png"
                    placeholder="Choose an Image Wallet ..." />
            </b-form-group>
            <b-form-group v-show="decoding.walletFile">
                <b-row>
                    <b-col sm="3">
                        <label for="decodingPrivateKey">Private Key:</label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-input
                            id="decodingPrivateKey"
                            type="text"
                            v-model="decoding.privateKey"
                            disabled />
                    </b-col>
                </b-row>
            </b-form-group>
            <b-form-group v-show="decoding.walletFile">
                <b-row>
                    <b-col sm="3">
                        <label for="decodingImageWallet">Image Wallet:</label>
                    </b-col>
                    <b-col sm="9">
                        <b-img id="decodingImageWallet" alt="Decoded Image Wallet" fluid style="text-align: center;"/>
                    </b-col>
                </b-row>
            </b-form-group>

        </b-container>

        <!-- ---------------------------------------------- -->
        <!-- Modal - displays generated wallet              -->
        <!-- ---------------------------------------------- -->
        <b-modal ref="iwModalRef" hide-footer title="Agora Imagewallet">
            <div id="imageWalletDemoContainer" class="d-block text-center" />
            <b-btn class="mt-3" block @click="onSaveWallet">SAVE</b-btn>
        </b-modal>
    </div>
</template>

// **************************************************
// View Javascript.
// **************************************************
<script>
import * as ImageWallet from '@trinkler/imagewallet';
import { saveAs } from 'file-saver/FileSaver';
import domtoimage from 'dom-to-image';

// Application view.
export default {
    name: 'imageWalletDemoApplication',

    // View model.
    data() {
        return {
            action: 'encode',
            actions: [
                { value: 'encode', text: 'Encode' },
                { value: 'decode', text: 'Decode' },
            ],
            decoding: {
                password: 'P96P4Bdp6wMy4pBV',
                privateKey: null,
                walletFile: null,
            },
            encoding: {
                credentials: {
                    password: 'P96P4Bdp6wMy4pBV',
                    privateKey:
                        '02f987803ea5bf8960c76c35f6d518d29144604668086daba0d4f5322b0d576e',
                },
                wallet: null,
            },
            IW: ImageWallet,
        };
    },

    // View handlers.
    methods: {
        // Event handler: on decode initiation.
        async onDecode(encoded) {
            await ImageWallet.decode(encoded, this.decoding.password)
                .then(this.onDecodeComplete)
                .catch(this.onDecodeError);
        },

        // Event handler: on decode completed.
        async onDecodeComplete(response) {
            this.decoding.privateKey = response.data.privateKey;
            const stream = new FileReader();
            stream.onload = function(e) {
                const $decodingImageWallet = document.getElementById(
                    'decodingImageWallet',
                );
                $decodingImageWallet.src = stream.result;
            };
            stream.readAsDataURL(this.decoding.walletFile);
        },

        // Event handler: on decode error.
        async onDecodeError(err) {
            // TODO display error modal.
            alert(err.message);
        },

        // Event handler: on encode initiation.
        onEncode(evt) {
            ImageWallet.encode(this.encoding.credentials, {})
                .then(this.onEncodeComplete)
                .catch(this.onEncodeError);
        },

        // Event handler: on encode complete.
        onEncodeComplete(wallet) {
            // Cache result.
            this.encoding.wallet = wallet;

            // Update DOM.
            const $container = document.getElementById(
                'imageWalletDemoContainer',
            );
            while ($container.firstChild) {
                $container.removeChild($container.firstChild);
            }
            $container.appendChild(wallet);

            // Display wallet modal.
            this.$refs.iwModalRef.show();
        },

        // Event handler: on encode error.
        onEncodeError(err) {
            alert(err.message);
        },

        // Event handler: on save wallet to file system.
        onSaveWallet(evt) {
            domtoimage.toBlob(this.encoding.wallet).then((blob) => {
                saveAs(blob, 'my-agora-image-wallet-noir.png');
            });
        },
    },
};
</script>
