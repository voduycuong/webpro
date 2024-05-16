function showModal(memberName, memberInfo) {
    const modal = document.getElementById('modal');
    const memberNameElement = document.getElementById('member-name');
    const memberInfoElement = document.getElementById('member-info');

    memberNameElement.textContent = memberName;
    memberInfoElement.textContent = memberInfo;
    memberInfoElement.innerHTML = memberInfo.replace(/\n/g, '<br>'); // Replace new lines with <br> tags for multiline support

    modal.style.display = 'block';
    document.body.classList.add('dimmed');
}

function hideModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.classList.remove('dimmed');
}