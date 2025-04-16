const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


// User Schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: { 
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    purchase_quantity: {
        type: Number,
        default: 0,
    },
    purchase_amount: {
        type: Number,
        default: 0,
    },
    avatar:{
        type: String,
        default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAwFJREFUWEfFl1moTlEUx39/JDInvMg8pItEGRIPN5lnD3hVnq4URTKVIZKU4UEpz4bMZUpChozJEGXIXJKpDG9aztK++u653zn7fK66q06nvrP+//Xfe6+91vpEI5saOT6FBZhZJ2AmMBoYCfQP4n8A74AXwG3giqQzRRcWFWBmTYEaYD3QriDxE2BDInKfpF95mFwBZlYF7AcGFgycdnsMTJf0LAufKcDMRgGnK1h1VozPwARJfjz1rKwAM5sFHPnHVWfBqiVdSH+sJyBs+73kDP3s/6d9BAZI8vdfKyfAt2pYJPI1YAXwIPgNBraE25EHPSNpUqYAM1sI7IkEPyBpXjkfMzuUiJoTwU+RdKrWp84OmNkdYGgOwRegl6SvGQI6As8jiXtO0vh6AsxsEHA/ov6IpNwVmtkJYFqEp0rSI/f5uwNmtgNYHAFukeRnn2lmtg1YGuHZLGllWkBs+93/mCS/onkCiuzABUnVaQEvge4R5V5U+kn6lJEDnYGnQNsIz0tJPdMCfiZXqWUE6J8PSpqbIeBwkkezC3B8ldQhLeA70KoA2F2uA8tD0jbzApNgtxaoA7X03yW1SQvwdtqjoICGur2W9Oe4S2+BN56JDWUuiD8vaVxawOrQwwtyNMhtjaSNaQFjgUs5tF4+13qly6mE7YE+gJNPyOHyaupHXnckM7OsPNguaUklazazXcCiMphbSS8YXvt7uhcsAPamQFeBMZKsQgFNAO//vrOlNlHS2SwBDrqZaseTJXmCVmxmNh04XgI8KqlOnSg3D/QGHgItArCLpA8VRwfMrCvwJmC9zvSV9L6UK2skK1Xutb1G0ttKRITgu5NRfWrAzZDkXHUsNpSeBLxkeplem1Qv73RRM7NlSYKvC6Xd+4cPIV4961lsLB8C7PQkDMhvIUduAP44afOQM57ZI8LTOvhf9puQnHvmnBH9Y+JEZuZz3KakHbugInYXWFUkeQsJqI1oZvPDbnQLrdvfbq+BV+F9UdLBIirdpyIBRUkr8Wt0Ab8B4kX0IZv9jnUAAAAASUVORK5CYII=',
    },
    address: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        default: '',
    },
});
UserSchema.plugin(AutoIncrement, { inc_field: 'user_id' });

module.exports = mongoose.model('User', UserSchema);