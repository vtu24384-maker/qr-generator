const urlInput = document.getElementById('urlInput');
const generateBtn = document.getElementById('generateBtn');
const qrcodeContainer = document.getElementById('qrcode');
const downloadBtn = document.getElementById('downloadBtn');

let qrcode = null;

generateBtn.addEventListener('click', generateQRCode);

urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        generateQRCode();
    }
});

function generateQRCode() {
    const url = urlInput.value.trim();
    
    if (!url) {
        alert('Please enter a URL');
        return;
    }
    
    // Clear previous QR code
    qrcodeContainer.innerHTML = '';
    
    // Generate new QR code
    qrcode = new QRCode(qrcodeContainer, {
        text: url,
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // Show download button
    downloadBtn.style.display = 'inline-block';
}

downloadBtn.addEventListener('click', () => {
    const canvas = qrcodeContainer.querySelector('canvas');
    if (canvas) {
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = url;
        link.click();
    }
});
