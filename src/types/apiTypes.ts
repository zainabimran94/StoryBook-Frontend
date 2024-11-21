//Auth Interface
export interface RegisterDto 
{
    email: string;
    name: string;
    password: string;
}

export interface LoginDto 
{
    email: string;
    password: string;
}

// UserGroup Interface {GET req}
export interface AgeGroupDto
{
    ageGroupId: number; 
    groupName: string; 
}

export interface ThemeGroupDto
{
    themeId: string;
    themeName: string;
}

// // UserGroup Interface {POST req}
export interface SelectGroupDto
{
    userId: string;
    ageGroupId: string;
    themeId: string;
}

// UserPreference Dto
export interface GetPreferenceDto
{
    userId: string;
    userGroupId: string;
    themeName: string;
    groupName: string;
    images: ImagesDto[];
}

export interface ImagesDto
{
    images: string;
    imagesDesc: string;
}

export interface SendPreferenceDto
{
    groupName: string;
    themeName: string;
    imageDesc?: string;
    storyDesc?: string;
    userId: string;
}

export interface GetStoryDto
{
    userId: String;
    storyGenTitle: string;
    storyBook: string;
    storyImageUrl: string;
    pythonDataId: string;
}