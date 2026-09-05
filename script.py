import re

with open('nova_ficha.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Add styles
html = html.replace('</style>', '''        .wizard-step { display: none; }
        .wizard-step.active { display: block; }
        .step-indicator { display: flex; justify-content: space-between; margin-bottom: 2rem; border-bottom: 2px solid #eee; padding-bottom: 1rem; overflow-x: auto; white-space: nowrap; gap: 10px; }
        .step-item { flex: 1; text-align: center; font-weight: bold; color: #9ca3af; padding: 0.5rem; }
        .step-item.active { color: #ea580c; border-bottom: 3px solid #ea580c; margin-bottom: -17px; }
    </style>''')

# Update body padding
html = html.replace('<body class="bg-gray-100 p-4 md:p-6">', '<body class="bg-gray-100 p-2 md:p-6">')
html = html.replace('<div class="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded shadow">', '<div class="max-w-4xl mx-auto bg-white p-4 md:p-8 rounded shadow">')

# Replace steps layout
# Intro to step 1
html = html.replace('<form id="novaFichaForm">', '''<form id="novaFichaForm">
            <div class="step-indicator text-sm md:text-base">
                <div class="step-item active" id="indicator-1">1. Proprietário</div>
                <div class="step-item" id="indicator-2">2. Imóvel</div>
                <div class="step-item" id="indicator-3">3. Condições</div>
            </div>

            <!-- STEP 1 -->
            <div class="wizard-step active" id="step-1">''')

html = html.replace('<h2 class="text-xl font-semibold mb-4 border-b pb-2 text-orange-600">1. Caracterização do Proprietário</h2>', '<h2 class="text-xl font-semibold mb-4 text-gray-700">Caracterização do Proprietário</h2>')

# Fix grid for step 1
html = html.replace('<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">', '<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">')
html = html.replace('<div class="col-span-2">\n                    <label class="block text-sm font-medium mb-1">Nome Completo</label>', '<div class="col-span-1 md:col-span-2">\n                    <label class="block text-sm font-medium mb-1">Nome Completo</label>')
html = html.replace('<div class="col-span-2">\n                    <label class="block text-sm font-medium mb-1">Logradouro', '<div class="col-span-1 md:col-span-2">\n                    <label class="block text-sm font-medium mb-1">Logradouro')


# Step 1 to Step 2
html = html.replace('''            <!-- 2. Descrição do Imóvel -->''', '''            <div class="mt-6 flex justify-between items-center border-t pt-4">
                <a href="dashboard.html" class="text-gray-600 hover:underline">Cancelar</a>
                <button type="button" class="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 font-bold" onclick="nextStep(2)">Próximo</button>
            </div>
            </div>

            <!-- STEP 2 -->
            <div class="wizard-step" id="step-2">''')

html = html.replace('<h2 class="text-xl font-semibold mb-4 border-b pb-2 text-orange-600">2. Descrição do Imóvel</h2>', '<h2 class="text-xl font-semibold mb-4 text-gray-700">Descrição do Imóvel</h2>')

html = html.replace('<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">', '<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2 text-sm">')

# Responsive classes in step 2
html = html.replace('col-span-3', 'col-span-1 md:col-span-3')
html = html.replace('col-span-2', 'col-span-1 md:col-span-2')

# Fix inputs that don't scale well
html = html.replace('flex gap-4 items-center', 'flex flex-col md:flex-row gap-2 md:gap-4 md:items-center')
html = html.replace('flex flex-wrap gap-4 items-center', 'flex flex-col md:flex-row gap-2 md:gap-4 md:items-center')
html = html.replace('flex flex-wrap gap-6 items-center', 'flex flex-col md:flex-row gap-4 md:gap-6 md:items-center')
html = html.replace('w-full border rounded p-1', 'w-full border rounded p-2 md:p-1')


# Step 2 to Step 3
html = html.replace('''            <!-- 3. Valor e Condições -->''', '''            <div class="mt-6 flex justify-between items-center border-t pt-4">
                <button type="button" class="text-gray-600 hover:underline font-semibold" onclick="nextStep(1)">Anterior</button>
                <button type="button" class="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 font-bold" onclick="nextStep(3)">Próximo</button>
            </div>
            </div>

            <!-- STEP 3 -->
            <div class="wizard-step" id="step-3">''')

html = html.replace('<h2 class="text-xl font-semibold mt-8 mb-4 border-b pb-2 text-orange-600">3. Valor e condições de pagamento</h2>', '<h2 class="text-xl font-semibold mb-4 text-gray-700">Valor e Condições de Pagamento</h2>')

html = html.replace('border rounded p-1 w-32', 'border rounded p-2 md:p-1 w-full md:w-32')
html = html.replace('border rounded p-1 flex-grow', 'border rounded p-2 md:p-1 w-full md:flex-grow')

html = html.replace('''            <div class="mt-8 flex justify-between items-center">
                <a href="dashboard.html" class="text-gray-600 hover:underline">Cancelar</a>
                <button type="submit" class="bg-gray-800 text-white px-6 py-3 rounded hover:bg-black font-bold">Gerar Ficha</button>
            </div>''', '''            <div class="mt-6 flex justify-between items-center border-t pt-4">
                <button type="button" class="text-gray-600 hover:underline font-semibold" onclick="nextStep(2)">Anterior</button>
                <button type="submit" class="bg-gray-800 text-white px-6 py-3 rounded hover:bg-black font-bold">Gerar Ficha</button>
            </div>
            </div>''')

# Add script function
html = html.replace('''function generateToken() {''', '''function nextStep(step) {
            // Simple validation before moving
            if (step === 2 && !document.getElementById('novaFichaForm').reportValidity()) return;

            document.querySelectorAll('.wizard-step').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.step-item').forEach(el => el.classList.remove('active'));

            document.getElementById('step-' + step).classList.add('active');
            document.getElementById('indicator-' + step).classList.add('active');

            window.scrollTo(0, 0);
        }

        function generateToken() {''')

with open('nova_ficha.html', 'w', encoding='utf-8') as f:
    f.write(html)
